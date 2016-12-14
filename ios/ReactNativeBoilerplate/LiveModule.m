//
//  LiveModule.m
//  ReactNativeBoilerplate
//
//  Created by Bob Wei on 12/14/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "LiveModule.h"
#import "RCTLog.h"
#import "LFLiveKit.h"

inline static NSString *formatedSpeed(float bytes, float elapsed_milli) {
  if (elapsed_milli <= 0) {
    return @"N/A";
  }

  if (bytes <= 0) {
    return @"0 KB/s";
  }

  float bytes_per_sec = ((float)bytes) * 1000.f /  elapsed_milli;
  if (bytes_per_sec >= 1000 * 1000) {
    return [NSString stringWithFormat:@"%.2f MB/s", ((float)bytes_per_sec) / 1000 / 1000];
  } else if (bytes_per_sec >= 1000) {
    return [NSString stringWithFormat:@"%.1f KB/s", ((float)bytes_per_sec) / 1000];
  } else {
    return [NSString stringWithFormat:@"%ld B/s", (long)bytes_per_sec];
  }
}

@interface LiveModule ()<LFLiveSessionDelegate>

@property (nonatomic, strong) LFLiveDebug *debugInfo;
@property (nonatomic, strong) LFLiveSession *session;

@end

@implementation LiveModule

RCT_EXPORT_MODULE();

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

- (LFLiveSession*)session {
  RCTLog(@"session");
  if (!_session) {
    _session = [[LFLiveSession alloc] initWithAudioConfiguration:[LFLiveAudioConfiguration defaultConfiguration] videoConfiguration:[LFLiveVideoConfiguration defaultConfiguration]];
    _session.delegate = self;
    // _session.showDebugInfo = YES;
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
  RCTLogInfo(@"liveStateDidChange: %ld", state);
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
  RCTLogInfo(@"debugInfo uploadSpeed: %@", formatedSpeed(debugInfo.currentBandwidth, debugInfo.elapsedMilli));
}

/** callback socket errorcode */
- (void)liveSession:(nullable LFLiveSession *)session errorCode:(LFLiveSocketErrorCode)errorCode {
  RCTLogInfo(@"errorCode: %ld", errorCode);
}


@end
