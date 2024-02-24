package com.visioncamerabinaryscanner;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import com.mrousavy.camera.frameprocessor.FrameProcessorPluginRegistry;
import com.visioncamerabinaryscanner.VisionCameraBinaryScannerPlugin;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class VisionCameraBinaryScannerPackage implements ReactPackage {
  static {
    FrameProcessorPluginRegistry.addFrameProcessorPlugin(
            "scanCodes",
            (proxy, options) -> new VisionCameraBinaryScannerPlugin(proxy, options)
    );
  }

  @NonNull
  @Override
  public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
    // List<NativeModule> modules = new ArrayList<>();
    // modules.add(new VisionCameraBinaryScannerModule(reactContext));
    // return modules;
    return Collections.emptyList();
  }

  @NonNull
  @Override
  public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}
