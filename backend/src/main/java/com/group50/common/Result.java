package com.group50.common;

import lombok.Data;

/**
 * Encapsulate the return result
 * @param <T> Custom return value data type
 */
@Data
public class Result<T> {


    /**
     * DATA
     */
    private T data;
    /**
     * STATE CODE
     */
    private Integer code;
    /**
     * MSG
     */
    private String msg;

    public Result() {
    }

    public static <T> Result<T> success() {
        Result<T> result = new Result<>();
        result.setCode(ResultInfo.SUCCESS_CODE);
        result.setMsg(ResultInfo.SUCCESS_MSG);
        return result;
    }

    public static <T> Result<T> success(T data) {
        Result<T> result = success();
        result.setData(data);
        return result;
    }

    public static <T> Result<T> success(T data, String Msg) {
        Result<T> result = success();
        result.setMsg(Msg);
        result.setData(data);
        return result;
    }

    public static <T> Result<T> success(T data, Integer code, String Msg) {
        Result<T> result = new Result<>();
        result.setCode(code);
        result.setMsg(Msg);
        result.setData(data);
        return result;
    }

    public static <T> Result<T> fail() {
        Result<T> result = new Result<>();
        result.setCode(ResultInfo.FAIL_CODE);
        result.setMsg(ResultInfo.FAIL_MSG);
        return result;
    }

    public static <T> Result<T> fail(T data) {
        Result<T> result = fail();
        result.setData(data);
        return result;
    }

    public static <T> Result<T> fail(T data, String Msg) {
        Result<T> result = fail();
        result.setMsg(Msg);
        result.setData(data);
        return result;
    }

    public static <T> Result<T> fail(Integer code, String Msg) {
        Result<T> result = fail();
        result.setCode(code);
        result.setMsg(Msg);
        return result;
    }

    public static <T> Result<T> fail(T data,Integer code, String Msg) {
        Result<T> result = new Result<>();
        result.setCode(code);
        result.setMsg(Msg);
        result.setData(data);
        return result;
    }

}
