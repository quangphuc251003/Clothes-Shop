function RenderQtyRedux() {
    let cart = JSON.parse(localStorage.getItem('cart'))
    var tong = 0
    if (cart) {
        Object.keys(cart).map((key, index) => {
            tong += cart[key]
        })
    }
    return tong
}
const initialState = {
    qty: RenderQtyRedux()
}

const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HOBBY': {
            function tongNew() {
                let cart = JSON.parse(localStorage.getItem('cart'))
                var tong = 0
                if (cart) {
                    Object.keys(cart).map((key, index) => {
                        tong += cart[key]
                    })
                }
                return tong
            }
            return {
                qty: tongNew()
            }
        }
        default:
            return state
    }
}

export default hobbyReducer