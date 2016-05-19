//
//  SSI18N.m
//  sehva
//
//  Created by LawLincoln on 15/6/11.
//  Copyright (c) 2015年 sehva. All rights reserved.
//

#import "SSI18N.h"
#import <Aspects.h>
#import <objc/runtime.h>
#import <UIKit/UIKit.h>
typedef NS_ENUM(NSUInteger, TextType) {
    TextTypeNormal,
    TextTypeAttribute
};
static NSString *contentKey = @"_content";
static NSString *attrKey    = @"_synthesizedAttributedText";
@implementation SSI18N
+ (void)i18n{
    [UILabel aspect_hookSelector:@selector(setText:) withOptions:AspectPositionAfter usingBlock:^(id<AspectInfo> aspectInfo, NSString *text) {
        UILabel *b = aspectInfo.instance;
        [self i18NContent:text toLabel:b withType:TextTypeNormal];
    } error:NULL];
    
    [UILabel aspect_hookSelector:@selector(setAttributedText:) withOptions:AspectPositionAfter usingBlock:^(id<AspectInfo>aspectInfo,NSAttributedString *attr){
        if (attr) {
            UILabel *b = aspectInfo.instance;
            [self i18NContent:attr toLabel:b withType:TextTypeAttribute];
        }
    }error:NULL];
}

+ (void)i18NContent:(id)content
            toLabel:(UILabel*)lable
           withType:(TextType)type{
    BOOL isNormal = type == TextTypeNormal;
    NSString *iVarKey = isNormal ? contentKey : attrKey;
    NSString *keyTo = isNormal ? (NSString*)content : ((NSAttributedString*)content).string;
    Ivar ivar = class_getInstanceVariable([UILabel class], [iVarKey UTF8String]);
    NSDictionary *customDict = [self currentLocaleCustomFile];
    NSString *classStr = NSStringFromClass(lable.class);
    
    if (!lable || ![classStr isEqualToString:@"UILabel"]) {
        return;
    }
    
   __block NSString *toReplace = NSLocalizedString(keyTo, nil);
    if (customDict) {
        toReplace = customDict[keyTo];
    }
    if (toReplace == nil) {
        toReplace = keyTo;
    }
    if (isNormal) {
        dispatch_async(dispatch_get_main_queue(), ^{
            object_setIvar(lable, ivar, toReplace);
            [lable setNeedsDisplay];
        });
    }else{
        NSAttributedString *attr = (NSAttributedString*)content;
        NSRange range = NSMakeRange(0, attr.string.length-1);
        __block NSAttributedString *text = nil;
        [attr enumerateAttributesInRange:range options:NSAttributedStringEnumerationReverse usingBlock:
         ^(NSDictionary *attributes, NSRange range, BOOL *stop) {
             text = [[NSAttributedString alloc]initWithString:toReplace attributes:attributes];
         }];
        if (text != nil) {
            dispatch_async(dispatch_get_main_queue(), ^{
                object_setIvar(lable, ivar, text);
                [lable setNeedsDisplay];
            });
        }
    }
}
#pragma mark - Directory
+ (NSString* __nonnull )appPath{
    NSString *docPath = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0];
    NSString *appPath = [docPath stringByAppendingPathComponent:@"i18n"];
    NSFileManager *fs = [NSFileManager defaultManager];
    BOOL isD = YES;
    if (![fs fileExistsAtPath:appPath isDirectory:&isD]) {
        [fs createDirectoryAtPath:appPath withIntermediateDirectories:NO attributes:nil error:nil];
    }
    return appPath;
}
#pragma mark Read current Locale Custom i18n File
+ ( NSDictionary*)currentLocaleCustomFile{
    NSString *locale = [[NSLocale currentLocale] localeIdentifier];
    NSString *localeFile = [[self appPath] stringByAppendingPathComponent:locale];
    NSFileManager *fs = [NSFileManager defaultManager];
    BOOL isD = NO;
    if ([fs fileExistsAtPath:localeFile isDirectory:&isD]) {
        NSData *data = [NSData dataWithContentsOfFile:localeFile];
        NSError *error = nil;
        if (data) {
            NSDictionary *d = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&error];
            if (error) {
#if DEBUG
                NSLog(@"Serialization file:\n%@ \nerror:%@",localeFile,error.localizedDescription);
#endif
                return nil;
            }
            return d;
        }
    }
    return nil;
}
#pragma mark - Add Custom I18N File By Url
+ (void)addI18nFileWith:( NSString* )localeIdentifier
              urlString:( NSString* )urlStr
                   done:( I18NDownloadBlock)block{
    NSString *locale = [[NSLocale currentLocale] localeIdentifier];
    NSString *key = !localeIdentifier ? locale : localeIdentifier;
    [SSI18N addI18nFileWithDict:@{key:urlStr} done:block];
}

/**
 *  addI18nFileWithDict
 *
 *  @param dict  key for localeIdentifier ,and value for the file url,such as "http://"
 *  @param block doneBlock return BOOL weather download and save success
 */
+ (void)addI18nFileWithDict:( NSDictionary*)dict
                   done:(I18NDownloadBlock)block{
    NSArray *keys = dict.allKeys;
    if (keys.count == 0) {
        !block ?:block();
        return;
    }
    NSFileManager *fs = [NSFileManager defaultManager];
    BOOL isD = NO;
    NSString *filePath = nil;
    NSMutableArray *keysToDown = [NSMutableArray arrayWithArray:keys];
    for (NSString *key in keys) {
        filePath = [[self appPath] stringByAppendingPathComponent:key];
        if ([fs fileExistsAtPath:filePath isDirectory:&isD]) {
            [keysToDown removeObject:key];
        }
    }
    if (keysToDown.count == 0) {
        !block ?:block();
        return;
    }
    
    // Create the dispatch group
    dispatch_group_t serviceGroup = dispatch_group_create();
    
    // Start the first service
    dispatch_group_enter(serviceGroup);
    __block NSUInteger count = 0;
    for (NSUInteger index = 0; index < keysToDown.count; index++) {
        NSString*key = keys[index];
        NSString *url = dict[key];
        [self downloadFileWith:url done:^(NSData * data) {
            if (data) {
                NSString *localeFile = [[SSI18N appPath] stringByAppendingPathComponent:key];
                [data writeToFile:localeFile atomically:YES];
            }else{
                #if DEBUG
                NSLog(@"faile download file with url:%@",url);
                #endif
            }
            count++;
            if (count >= keysToDown.count) {
                dispatch_group_leave(serviceGroup);
            }
        }];
    }
    
    dispatch_group_notify(serviceGroup,dispatch_get_main_queue(),^{
        !block ?:block();
    });
}

+ (void)downloadFileWith:( NSString* )url done:(void(^)( NSData* data))done{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
        NSURL *aurl = [NSURL URLWithString:url];
        NSData *data = [NSData dataWithContentsOfURL:aurl];
        !done ? : done(data);
    });
}
#pragma mark
+ (void)cleanAllFile{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
        NSFileManager *fs = [NSFileManager defaultManager];
        NSString *appPath = [self appPath];
        NSArray *files = [fs contentsOfDirectoryAtPath:appPath error:nil];
        if (files.count > 0) {
            for (NSString *file in files) {
                [fs removeItemAtPath:[appPath stringByAppendingString:file] error:nil];
            }
        }
    });
}
@end
