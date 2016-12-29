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

#pragma mark -- RCTViewManager

- (UIView *)view {
  return self.containerView;
}

- (UIView *)containerView {
  if (!_containerView) {
    _containerView = [UIView new];
    self.session.preView = _containerView;
  }
  return _containerView;
}

#pragma mark -- Native Module Methods

RCT_EXPORT_METHOD(requestPermissions) {
  [self requestAccessForVideo];
  [self requestAccessForAudio];
}

- (void)requestAccessForVideo {
    __weak typeof(self) _self = self;
    AVAuthorizationStatus status = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    switch (status) {
    case AVAuthorizationStatusNotDetermined: {
        // 许可对话没有出现，发起授权许可
        [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {
                if (granted) {
                    dispatch_async(dispatch_get_main_queue(), ^{
                        [_self.session setRunning:YES];
                    });
                }
            }];
        break;
    }
    case AVAuthorizationStatusAuthorized: {
        // 已经开启授权，可继续
        dispatch_async(dispatch_get_main_queue(), ^{
            [_self.session setRunning:YES];
        });
        break;
    }
    case AVAuthorizationStatusDenied:
    case AVAuthorizationStatusRestricted:
        // 用户明确地拒绝授权，或者相机设备无法访问

        break;
    default:
        break;
    }
}

- (void)requestAccessForAudio {
    AVAuthorizationStatus status = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeAudio];
    switch (status) {
    case AVAuthorizationStatusNotDetermined: {
        [AVCaptureDevice requestAccessForMediaType:AVMediaTypeAudio completionHandler:^(BOOL granted) {
            }];
        break;
    }
    case AVAuthorizationStatusAuthorized: {
        break;
    }
    case AVAuthorizationStatusDenied:
    case AVAuthorizationStatusRestricted:
        break;
    default:
        break;
    }
}

#pragma mark -- Live Session

- (LFLiveSession*)session {
  if (!_session) {
    _session = [[LFLiveSession alloc] initWithAudioConfiguration:[LFLiveAudioConfiguration defaultConfiguration] videoConfiguration:[LFLiveVideoConfiguration defaultConfiguration]];
    _session.delegate = self;
    _session.preView = self.containerView;
    _session.showDebugInfo = YES;
  }
  return _session;
}

RCT_EXPORT_METHOD(startLive:(NSString *)streamUrl) {
  LFLiveStreamInfo *streamInfo = [LFLiveStreamInfo new];
  streamInfo.url = streamUrl;
  [self.session startLive:streamInfo];
}

RCT_EXPORT_METHOD(stopLive) {
  [self.session stopLive];
}

#pragma mark -- LFStreamingSessionDelegate
- (void)liveSession:(nullable LFLiveSession *)session liveStateDidChange:(LFLiveState)state {
  switch (state) {
    case LFLiveReady:
      RCTLogInfo(@"未连接");
      break;
    case LFLivePending:
      RCTLogInfo(@"连接中");
      break;
    case LFLiveStart:
      RCTLogInfo(@"已连接");
      break;
    case LFLiveError:
      RCTLogInfo(@"连接错误");
      break;
    case LFLiveStop:
      RCTLogInfo(@"未连接");
      break;
    default:
      break;
  }
}

/** live debug info callback */
- (void)liveSession:(nullable LFLiveSession *)session debugInfo:(nullable LFLiveDebug *)debugInfo {
}

/** callback socket errorcode */
- (void)liveSession:(nullable LFLiveSession *)session errorCode:(LFLiveSocketErrorCode)errorCode {
  RCTLogInfo(@"errorCode: %ld", errorCode);
}

@end
