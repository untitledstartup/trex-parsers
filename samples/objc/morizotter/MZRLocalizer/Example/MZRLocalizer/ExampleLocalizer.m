//
//  ExampleLocalizer.m
//  MZRLocalizer
//
//  Created by MORITA NAOKI on 2014/03/08.
//  Copyright (c) 2014年 molabo. All rights reserved.
//

#import "ExampleLocalizer.h"

NSString *const ExampleLocalizerViewControllerTitle = @"ExampleLocalizerViewControllerTitle";
NSString *const ExampleLocalizerViewControllerJapan = @"ExampleLocalizerViewControllerJapan";
NSString *const ExampleLocalizerViewControllerUnitedStates = @"ExampleLocalizerViewControllerUnitedStates";
NSString *const ExampleLocalizerViewControllerFrance = @"ExampleLocalizerViewControllerFrance";
NSString *const ExampleLocalizerViewControllerGermany = @"ExampleLocalizerViewControllerGermany";
NSString *const ExampleLocalizerViewControllerChina = @"ExampleLocalizerViewControllerChina";

NSString *const ExampleLocalizerColorRed = @"ExampleLocalizerColorRed";
NSString *const ExampleLocalizerColorBlue  = @"ExampleLocalizerColorBlue";
NSString *const ExampleLocalizerColorBlack  = @"ExampleLocalizerColorBlack";
NSString *const ExampleLocalizerColorYellow  = @"ExampleLocalizerColorYellow";
NSString *const ExampleLocalizerColorWhite  = @"ExampleLocalizerColorWhite";
NSString *const ExampleLocalizerColorOrange  = @"ExampleLocalizerColorOrange";
NSString *const ExampleLocalizerColorPink  = @"ExampleLocalizerColorPink";

@implementation ExampleLocalizer

- (NSDictionary *)prepareLocalizationDictionary {
	NSMutableDictionary *dict = [NSMutableDictionary dictionary];
	// ViewController
	dict[ExampleLocalizerViewControllerTitle] = NSLocalizedString(@"ExampleLocalizerViewControllerTitle", nil);
	dict[ExampleLocalizerViewControllerJapan] = NSLocalizedString(@"ExampleLocalizerViewControllerJapan", nil);
	dict[ExampleLocalizerViewControllerUnitedStates] = NSLocalizedString(@"ExampleLocalizerViewControllerUnitedStates", nil);
	dict[ExampleLocalizerViewControllerFrance] = NSLocalizedString(@"ExampleLocalizerViewControllerFrance", nil);
	dict[ExampleLocalizerViewControllerGermany] = NSLocalizedString(@"ExampleLocalizerViewControllerGermany", nil);
	dict[ExampleLocalizerViewControllerChina] = NSLocalizedString(@"ExampleLocalizerViewControllerChina", nil);
	// Color
	dict[ExampleLocalizerColorRed] = NSLocalizedStringFromTable(@"ExampleLocalizerColorRed", @"Colors", nil);
	dict[ExampleLocalizerColorBlue] = NSLocalizedStringFromTable(@"ExampleLocalizerColorBlue", @"Colors", nil);
	dict[ExampleLocalizerColorBlack] = NSLocalizedStringFromTable(@"ExampleLocalizerColorBlack", @"Colors", nil);
	dict[ExampleLocalizerColorYellow] = NSLocalizedStringFromTable(@"ExampleLocalizerColorYellow", @"Colors", nil);
	dict[ExampleLocalizerColorWhite] = NSLocalizedStringFromTable(@"ExampleLocalizerColorWhite", @"Colors", nil);
	dict[ExampleLocalizerColorOrange] = NSLocalizedStringFromTable(@"ExampleLocalizerColorOrange", @"Colors", nil);
	dict[ExampleLocalizerColorPink] = NSLocalizedStringFromTable(@"ExampleLocalizerColorPink", @"Colors", nil);
	return [NSDictionary dictionaryWithDictionary:dict];
}

@end
