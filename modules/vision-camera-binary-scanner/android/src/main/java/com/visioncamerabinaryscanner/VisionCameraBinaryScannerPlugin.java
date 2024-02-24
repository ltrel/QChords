package com.visioncamerabinaryscanner;

import android.media.Image;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.mrousavy.camera.frameprocessor.Frame;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;
import com.mrousavy.camera.frameprocessor.VisionCameraProxy;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Tasks;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.barcode.BarcodeScannerOptions;
import com.google.mlkit.vision.barcode.BarcodeScanning;
import com.google.mlkit.vision.barcode.BarcodeScanner;
import com.google.mlkit.vision.barcode.common.Barcode;

public class VisionCameraBinaryScannerPlugin extends FrameProcessorPlugin {
  public VisionCameraBinaryScannerPlugin(@NonNull VisionCameraProxy proxy, @Nullable Map<String, Object> options) {
    super();
  }

  @Nullable
  @Override
  public Object callback(@NonNull Frame frame, @Nullable Map<String, Object> arguments) {
    BarcodeScanner scanner = BarcodeScanning.getClient();
    Image mediaImage = frame.getImage();
    InputImage inputImage = InputImage.fromMediaImage(mediaImage, 0);

    List<Object> out = new ArrayList<>();
    boolean found = false;
    try {
      List<Barcode> barCodeList = Tasks.await(scanner.process(inputImage));
      if (!barCodeList.isEmpty()) {
        found = true;
        Barcode first = barCodeList.get(0);
        byte[] bytes = first.getRawBytes();
        for (int i = 0; i < bytes.length; i ++) {
          int positive = bytes[i] & 0xFF;
          double d = positive;
          out.add(d);
        }
      }
      
    } catch (ExecutionException | InterruptedException e) {
      return null;
    }
    return found ? out : null;
  }
}
