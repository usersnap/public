//
//  UsersnapSdkMethods.swift
//  reactNativeUsersnapSdk
//


import Foundation
import usersnapMobileSDK

@objc(UsersnapSdkMethods) class UsersnapSdkMethods: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { return true }

  @objc public func configure(_ apiKey: String) {
    UsersnapService.shared.debug = true
    UsersnapService.shared.configure(apiKey: apiKey,delegate: nil)
  }
  
  @objc func openFeedbackView(_ initProps: NSDictionary?) {
    let initPropsDict = initProps as? [String: String] ?? [:]
    let completionHandler: UsersnapCompletionHandler = { (_error) in
        if let error = _error {
            print(error)
            return
        }
        print("success")
    }
    UsersnapService.shared.openFeedbackView(customData: nil, completion: completionHandler, initParams: initPropsDict)
  }
}
