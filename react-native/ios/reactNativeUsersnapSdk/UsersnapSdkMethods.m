//
//  UsersnapSdkMethods.m
//  reactNativeUsersnapSdk
//
//  Created by hanna on 21.09.23.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(UsersnapSdkMethods, NSObject)
  RCT_EXTERN_METHOD(configure: (NSString *) apiKey)
  RCT_EXTERN_METHOD(openFeedbackView)
@end
