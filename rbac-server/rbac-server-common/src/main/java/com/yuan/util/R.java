package com.yuan.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class R <T>{
    private Integer code;
    private String msg;
    private T data;

    public static <T> R<T> success(T data) {
        R<T> result = new R<>();
        result.setCode(200);
        result.setMsg("success");
        result.setData(data);
        return result;
    }
    public static <T> R<T> error(String msg) {
        R<T> result = new R<>();
        result.setCode(500);
        result.setMsg(msg);
        result.setData(null);
        return result;
    }

    public static <T> R<T> build(Integer code, String msg, T data) {
        return new R<>(code, msg, data);
    }
}
