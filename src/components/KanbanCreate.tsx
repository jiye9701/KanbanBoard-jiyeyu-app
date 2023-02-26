import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { kanbanListState } from '../recoil';
import React from 'react';
import './KanbanCreate.scss';
import e from 'express';
// 

// https://recoiljs.org/docs/basic-tutorial/atoms/

function KanbanCreate({ title }: { title: string }) {
  const [kanbanList, setKanbanList] = useRecoilState(kanbanListState);

  const getId: number =
    kanbanList.length > 0 ? kanbanList[kanbanList.length - 1].id + 1 : 0;
    
    
    const addItem = useCallback(
      
      () => {
        setKanbanList((prev) => [
          ...prev,
          {
            id: getId,
            title: '',
            content: '',
            category: title,
            isChecked: false,
          },
        ]);
      },
      [getId, setKanbanList, title]
    );

  return (
    <div className="btnAddWrap">
      <button className="btnAdd" onClick={addItem}> + Add
      
      </button>
    </div>
  );
}

export default React.memo(KanbanCreate);
