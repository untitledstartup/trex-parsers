TMLLocalizedString(@"1. Localized Label"
  @" Second line"
    ", Third line", "cstring", @{@"dict": @"non-localized", @"dict2": TMLLocalizedString(@"Inner localized Label")}, @"Localized Comment");
TMLLocalizedString("2. Localized Label"
  @" Second line"
    ", Third line", "cstring", @{@"dict": @"non-localized", @"dict2": TMLLocalizedString(@"Inner localized Label")}, @"Localized Comment");