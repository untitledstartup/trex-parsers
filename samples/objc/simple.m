@implementation Simple

- (IBAction)onCancel:(id)sender {
    alert.messageText = NSLocalizedString(@"Are you sure you want to cancel?", nil);
}

@end