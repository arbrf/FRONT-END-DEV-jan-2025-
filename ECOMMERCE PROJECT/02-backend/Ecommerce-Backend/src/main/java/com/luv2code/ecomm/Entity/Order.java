package com.luv2code.ecomm.Entity;

import com.luv2code.ecomm.Dao.CustomerRespository;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "orders")
@AllArgsConstructor
public class Order {

    public Order() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Setter
    @Column(name = "order_tracking_number")
    private String orderTrackingNumber;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "total_quantity")
    private BigDecimal totalQuantity;

    @Column(name = "status")
    private String status;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date dateLastUpdated;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_address_id", referencedColumnName = "id")
    private Address shippingAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "billing_address_id", referencedColumnName = "id")
    private Address billingAddress;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private Set<OrderItem> orderItems = new HashSet<>();

    public void add(OrderItem orderItem) {
        if (orderItem != null) {
            if (orderItems == null) {
                orderItems = new HashSet<>();
            }
            orderItems.add(orderItem);
            orderItem.setOrder(this);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderTrackingNumber() {
        return orderTrackingNumber;
    }

    public void setOrderTrackingNumber(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateLastUpdated() {
        return dateLastUpdated;
    }

    public void setDateLastUpdated(Date dateLastUpdated) {
        this.dateLastUpdated = dateLastUpdated;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public BigDecimal getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(BigDecimal totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

}
