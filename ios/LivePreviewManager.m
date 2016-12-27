//
//  LivePreviewManager.m
//  ReactNativeBoilerplate
//
//  Created by Bob Wei on 12/27/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "LivePreviewManager.h"
#import "RCTLog.h"

@implementation LivePreviewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
  return self.containerView;
}

- (UIView *)containerView {
  if (!_containerView) {
    _containerView = [UIView new];
  }
  return _containerView;
}

@end
