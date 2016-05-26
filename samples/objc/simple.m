@implementation TestViewController

+(void)foo:(void (^)(void))block{
    
#ifdef TARGET_IPHONE_SIMULATOR
    block();
    return;
#else
    if([Foo isEnabled])
        block();
    else
    {
        [UIAlertView showWithTitle:TMLLocalizedString(@"1. We have \"the quotes\"?",@"Comment for quotes")
                           message:TMLLocalizedString(@"2. Hello (World!) hello world.")
                 cancelButtonTitle:TMLLocalizedString(@"Maybe for sure?")
                 otherButtonTitles:@[TMLLocalizedString(@"Really?")]
                       actionBlock:^(UIAlertView *alertView, NSInteger buttonIndex)
         {
             if ( alertView.firstOtherButtonIndex ) {
                 [[self.class sharedInstance] bar];
             }
             block();
         }];
    }
#endif
}

@end