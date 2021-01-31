import { Item } from '../Item/Item';
import './List.css';

export function List() {
  const list = [{
    name: 'Task 1'
  }];
  return (
    <>
      <div className='form'>
        <input type='text' />
        <button>Add</button>
      </div>
      <div className='list'>
        {list.map((item) => (
          <Item />
        ))}
      </div>
    </>
  );
}
