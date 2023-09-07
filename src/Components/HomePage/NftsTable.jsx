import React from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import TrendNData from '../../JsonFile/TrendingNftsData'

const NftsTable = () => {
    const [NftUpdates] = useState(TrendNData);
    return (
        <div className='nftstable'>
            <h3>All NFTS Update</h3>
            <div className="tablearea">
                <Table responsive className='m-0'>
                    <thead>
                        <tr>
                            <th>All Product</th>
                            <th>Value</th>
                            <th>USD</th>
                            <th>24H%</th>
                            <th>Bits</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NftUpdates.map((NftUpdates, i) => (
                            <tr key={NftUpdates.id}>
                                <td><img src={NftUpdates.allproductimg} className='img-fluid' alt="" /> {NftUpdates.allproduct}</td>
                                <td><img src={NftUpdates.valueimg} className='img-fluid' alt="" /> {NftUpdates.value}</td>
                                <td><span className='text-green'> {NftUpdates.usd}</span></td>
                                <td><span className='text-red'>{NftUpdates.percentage}</span></td>
                                <td>{NftUpdates.bits}</td>
                                <td>{NftUpdates.time}</td>
                                <td><a className='complatedbtn'>{NftUpdates.btnname}</a></td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
        </div >
    )
}

export default NftsTable