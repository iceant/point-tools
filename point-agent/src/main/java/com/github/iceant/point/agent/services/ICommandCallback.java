package com.github.iceant.point.agent.services;

import java.io.InputStream;

public interface ICommandCallback {
    void onSuccess(InputStream inputStream);

    void onError(InputStream inputStream);

    void onReturn(int code);
}
