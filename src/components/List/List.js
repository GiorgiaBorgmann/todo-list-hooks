import {Item} from '../Item/Item'

export function List() {
  const list = [];
  return <>
    {list.map(item => <Item />)}
  </>
}