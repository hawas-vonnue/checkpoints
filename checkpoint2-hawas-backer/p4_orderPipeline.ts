// added so the "cannot redeclare in same block" error doesnt show
// export {};

type Item = {
    sku: string;
    qty: number;
    price: number;
};

type Order = {
    id: number;
    customer: string;
    items: Item[];
    status: string;
    // status: "pending";
};

function orderTotal(order: Order): number {
    let total = 0;
    order.items.map((item) => (total = total + item.qty * item.price));

    return total;
}

function allItemsAcrossOrders(orders: Order[]) {
    let array: {
        orderId: number;
        sku: string;
        qty: number;
        price: number;
    }[] = [];
    orders.forEach((order) => {
        order.items.forEach((item) => {
            array.push({ orderId: order.id, ...item });
        });
    });

    return array;
}

function markShipped(orders: Order[], orderId: number) {
    let array: Order[] = [];
    orders.forEach((order) => {
        if (order.id === orderId) {
            order.status = "shipped";
            array.push(order);
        } else array.push(order);
    });

    return array;
}

function topCustomersBySpend(orders: Order[], n: number) {
    let customers: Set<string> = new Set();
    orders.forEach((order) => {
        customers.add(order.customer);
    });
    let array: { customer: string; total: number }[] = [];

    customers.forEach((customer) => {
        let total = 0;
        orders.forEach((order) => {
            if (order.customer === customer) {
                total = total + orderTotal(order);
            }
        });
        array.push({ customer, total });
    });
    array.sort((a, b) => {
        if (a.total - b.total !== 0) return b.total - a.total;
        else return b.customer.localeCompare(a.customer);
    });

    return array.slice(0, n);
}

export { orderTotal, allItemsAcrossOrders, markShipped, topCustomersBySpend };
//----------------Test---------------
let order1: Order = {
    id: 1,
    customer: "A",
    items: [{ sku: "X1", qty: 2, price: 50 }],
    status: "Pending",
};

let order2: Order = {
    id: 2,
    customer: "B",
    items: [{ sku: "X1", qty: 2, price: 50 }],
    status: "Pending",
};

let order3: Order = {
    id: 3,
    customer: "A",
    items: [{ sku: "X1", qty: 2, price: 50 }],
    status: "Pending",
};

let order4: Order = {
    id: 2,
    customer: "B",
    items: [{ sku: "X1", qty: 2, price: 50 }],
    status: "Pending",
};

const orders = [order1, order2, order3];

console.log(orderTotal(order1));
console.log(allItemsAcrossOrders(orders));
console.log(markShipped(orders, 1));
console.log(topCustomersBySpend(orders, 1));

orders.push(order4);
console.log(topCustomersBySpend(orders, 1));
