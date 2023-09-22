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
  
  @objc public func openFeedbackView() {
    UsersnapService.shared.openFeedbackView
     { (_error) in
         if let error = _error {
             print(error)
    return
    }
         print("success")
    }
  }
}
