import React from 'react'

export default function CostDetails({subtotal}: {subtotal: number}) {
    return (
        <div className="justify-self-end my-2 lg:px-6 flex justify-end">
            <div className="table-row-group">
                <div className="table-row">
                    <p className="font-bold table-cell">SUBTOTAL:</p> 
                    <p className="table-cell pl-6">${subtotal}</p>
                </div>
                <div className="table-row">
                    <p className="font-bold table-cell">TAX:</p> 
                    <p className="table-cell pl-6">${ (subtotal * 0.06).toFixed(2) }</p>
                </div>
                <div className="table-row text-tomato">
                    <p className="font-bold table-cell">TOTAL:</p> 
                    <p className="table-cell pl-6">${ (subtotal + (subtotal * 0.06)).toFixed(2) }</p>
                </div>
            </div>
        </div>
    )
}
