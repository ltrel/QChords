#import <Foundation/Foundation.h>
#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>
#import <VisionCamera/Frame.h>

#if __has_include("VisionCameraBinaryScanner/VisionCameraFaceDetector-Swift.h")
#import "VisionCameraBinaryScanner/VisionCameraFaceDetector-Swift.h"
#else
#import "VisionCameraBinaryScanner-Swift.h"
#endif

@interface VisionCameraBinaryScanner (FrameProcessorPluginLoader)
@end

@implementation VisionCameraBinaryScanner (FrameProcessorPluginLoader)
+ (void) load {
  [FrameProcessorPluginRegistry addFrameProcessorPlugin:@"detectFaces"
    withInitializer:^FrameProcessorPlugin*(VisionCameraProxyHolder* proxy, NSDictionary* options) {
    return [[VisionCameraBinaryScanner alloc] initWithProxy:proxy withOptions:options];
  }];
}
@end
