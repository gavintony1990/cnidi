package com.cnidi.dependencies.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cnidi.dependencies.entity.BaseEntity;

public interface BaseEntityMapper<T extends BaseEntity> extends BaseMapper<T> {
}
