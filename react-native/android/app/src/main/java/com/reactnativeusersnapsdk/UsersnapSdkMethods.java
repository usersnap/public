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
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
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

    static Map<String, String> toHashMap(ReadableMap map) {
        Map<String, String> hashMap = new HashMap();
        ReadableMapKeySetIterator iterator = map.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            switch (map.getType(key)) {
                case Null:
                    hashMap.put(key, null);
                    break;
                case String:
                    hashMap.put(key, map.getString(key));
                    break;
                default:
                    throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
            }
        }
        return hashMap;
    }

    @ReactMethod
    public void openFeedbackView(ReadableMap initParams, final Promise promise) {
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
        UsersnapManager.INSTANCE.openFeedbackView(this.context, customDataMap, this.toHashMap(initParams), email, activity.mStartForResult);
    }
}