//
//  LivePreviewManager.h
//  ReactNativeBoilerplate
//
//  Created by Bob Wei on 12/27/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTViewManager.h"
#import "RCTBridgeModule.h"
#import "LFLiveKit.h"

@interface LivePreviewManager : RCTViewManager <RCTBridgeModule, LFLiveSessionDelegate>

@property (nonatomic, strong) UIView *containerView;
@property (nonatomic, strong) LFLiveDebug *debugInfo;
@property (nonatomic, strong) LFLiveSession *session;

@end
