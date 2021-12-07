export const slicePrice = (price) => {
    const _price = price + "";
    if (_price.length < 4) return _price;
    else {
        const result = [];
        for (var i = 0; i < _price.length / 3; i++) {
            if (_price.length % 3 === 0)
                result.push(_price.substring(i * 3, i * 3 + 3));
            else {
                if (i === 0) result.push(_price.substring(0, _price.length % 3));
                else
                    result.push(
                        _price.substring(
                            (i - 1) * 3 + (_price.length % 3),
                            (i - 1) * 3 + (_price.length % 3) + 3
                        )
                    );
            }
        }
        return result.join(",");
    }
};