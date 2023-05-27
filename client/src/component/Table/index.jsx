import { useEffect, useState } from 'react'
import './style.css'

const Table = ({colDef,rowData,onSort}) => {
	// const [data,setData] = useState([]);
	const [sortBased,setSortBased] = useState({ sortOn : "" , order : 1});
	const onSortClickHandler = (sortOn,order) => {
		const newData = [...rowData]; 
		if(typeof rowData[0][sortOn] === 'string') {
			newData.sort((a,b) => order === 1 ? a[sortOn][0] > b[sortOn][0] ? 1 : -1 : a[sortOn][0] < b[sortOn][0] ? 1 : -1);
		} else if (sortOn === 'startDate' ) {
			
		} else {
			newData.sort((a,b) => order === 1 ? a[sortOn]> b[sortOn] ? 1 : -1 : a[sortOn] < b[sortOn] ? 1 : -1);
		}
		onSort(newData)
		setSortBased({sortOn,order})
	}
	return <div className="grid-container">
		<div className="col-header-row">
			{
				colDef?.map((col) => {
					return <div key={col.label} className={`cell ${col.sortable && "sort-cell"} ${sortBased.sortOn === col.name && 'sort-based-on-col'}`}>
						<span>{col.label}</span>
						{
							col.sortable && <div className='sort-icons'>
								<i 
								className={`fa fa-caret-up ${sortBased.order === 1 && 'is-active'}`} onClick={onSortClickHandler.bind(this,col.name,1)}></i>
								<i 
								className={`fa fa-caret-down ${sortBased.order === -1 && 'is-active'}`} onClick={onSortClickHandler.bind(this,col.name,-1)}></i>
								</div>
						}
					</div>
				})
			}
		</div>
		{
			rowData?.map((row) => {
				return <div>
					{
						colDef?.map((col) => {
							return col.cellRenderer ? col.cellRenderer(row,col.name): <div key={row.id + col.name} className="cell">{row[col.name]}</div>
						})
					}
				</div>
			})
		}
	</div>
}
export default Table;

