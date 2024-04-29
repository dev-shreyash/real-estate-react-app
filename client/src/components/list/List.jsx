import { listData } from '../../lib/dummyData'
import Card from '../card/Card'
import './list.scss'

function List(){
  return (
    <div className='list'>
        {listData.map(item=>{
            <Card key={item.id} item={item}/>
        })}
    </div>
  )
}

export default List