package com.cnidi.aiservice;

import com.cnidi.dubbo.api.service.AiRpcService;
import org.apache.dubbo.config.annotation.DubboService;

@DubboService
public class AiRpcServiceImpl implements AiRpcService {

    @Override
    public String ping() {
        return "cnidi-ai-service";
    }
}
