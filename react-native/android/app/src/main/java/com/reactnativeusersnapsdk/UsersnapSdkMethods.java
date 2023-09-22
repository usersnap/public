package com.reactnativeusersnapsdk;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.usersnap.usersnap_sdk.UsersnapManager;

import java.util.HashMap;
import java.util.Map;

public class UsersnapSdkMethods extends ReactContextBaseJavaModule {

    private ReactApplicationContext context;

    UsersnapSdkMethods(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "UsersnapSdkMethods";
    }

    @ReactMethod
    public void configure(String apiKey) {
        Log.println(Log.DEBUG, "configure USERSNAP", "OK");
        // enable debug mode (optional)
        UsersnapManager.INSTANCE.setDebugMode(true);
        // configure the SDK with an API key (required!)
        UsersnapManager.INSTANCE.configure(this.context, apiKey, true);
    }

    @ReactMethod
    public void openFeedbackView(final Promise promise) {
        Map<String, String> customDataMap = new HashMap<String, String>();

        customDataMap.put("custom_message", "A custom message");
        // optional - you can provide an email address which will be bound to
        // the feedback (e.g. email of an registered user)
        var email = "example@mail.com";
        MainActivity activity = (MainActivity) this.getReactApplicationContext().getCurrentActivity();
        activity.onActivityResultImplementation = result -> {
            ActivityResult activityResult = (ActivityResult) result;
            switch (activityResult.getResultCode()) {
                case Activity.RESULT_OK:
                    promise.resolve("OK");
                    break;
                case Activity.RESULT_CANCELED:
                    promise.resolve("CANCELED");
                    break;
                default:
                    promise.reject("FAILED");
                    break;
            }
            return null;
        };
        UsersnapManager.INSTANCE.openFeedbackView(this.context, customDataMap, email, activity.mStartForResult);
    }
}