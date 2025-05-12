package com.luv2code.ecomm.dto;

public class PaymentInfoDTO {
    private int amount;
    private String currency;

    private String recieptEmail;

    public String getRecieptEmail() {
        return recieptEmail;
    }

    public void setRecieptEmail(String recieptEmail) {
        this.recieptEmail = recieptEmail;
    }

    public PaymentInfoDTO(int amount, String currency, String recieptEmail) {
        this.amount = amount;
        this.currency = currency;
        this.recieptEmail=recieptEmail;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
