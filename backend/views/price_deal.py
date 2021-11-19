import csv
from datetime import date, datetime

with open("car_total2.csv", "r", encoding="UTF-8") as f:
    reader = csv.DictReader(f)

    for row in reader:
        price = row["가격"]
        count = []
        if not price.find("-") == -1:
            price0 = 0
            count.append(price0)

        if not price.find("~") == -1:
            price1, price2 = price.split("~")
            price1 = price1 + "만원"
            # print("price1 :", price1, "price2 :", price2)
            if price1.find("억") == -1:
                price1 = int(price1.replace("만원", "").replace(",", ""))
                price1 *= 10000
                price1 = int(price1)
                count.append(price1)

                # print("int 변환 때려요", price, price1)
            else:
                price3, price4 = price1.split("억")
                price3 = int(price3.replace("억", ""))
                price3 *= 100000000
                price4 = int(price4.replace("만원", "").replace(",", ""))
                price4 *= 10000
                price3 = price3 + price4
                count.append(price3)
                # print("price3 :", price3, "price4 :", price4, "진짜는 두구두구", price_real)

            if price2.find("억") == -1:
                price2 = int(price2.replace("만원", "").replace(",", ""))
                price2 *= 10000
                price2 = int(price2)
                # print("int 변환 때려요", price, price2)
                count.append(price2)
            else:
                price5, price6 = price2.split("억")
                price5 = int(price5.replace("억", ""))
                price5 *= 100000000
                price6 = int(price6.replace("만원", "").replace(",", ""))
                price6 *= 10000
                price5 = price5 + price6
                # print("price5 :", price5, "price6 :", price6, "진짜는 두구두구", price_real)
                count.append(price5)
        print(count)
