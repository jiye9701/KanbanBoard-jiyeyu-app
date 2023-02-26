import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useRecoilState } from 'recoil';
import { TITLENAME } from '../App';

import { kanbanListState } from '../recoil';
import './KabanCard.scss';

function KabanCard({ item }: { item: cardtype }) {
  const [list, setList] = useRecoilState(kanbanListState);
  const [badgeColor, setBadgeColor] = useState('');
  const index = list.findIndex((data) => data === item);
  const ref = useRef<HTMLTextAreaElement>(null);

  const { BACKLOG, TODO, INPROGRESS, DONE } = TITLENAME;

  const replaceIndex = (list: cardtype[], index: number, data: cardtype) => {
    return [...list.slice(0, index), data, ...list.slice(index + 1)];
  };

  const editTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newList = replaceIndex(list, index, {
      ...item,
      title: e.target.value,
    });
    setList(newList);
  };
  const editContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newList = replaceIndex(list, index, {
      ...item,
      content: e.target.value,
    });
    setList(newList);
  };

  //textera
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '80px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  const deleteItem = () => {
    setList([...list.slice(0, index), ...list.slice(index + 1)]);
  };

  const changeItemCategory = (selectedItem: cardtype, title: string) => {
    setList((prev) => {
      return prev.map((e) => {
        return {
          ...e,
          category: e.id === selectedItem.id ? title : e.category,
        };
      });
    });
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'card',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item: cardtype, monitor) => {
      const dropResult: drop | null = monitor.getDropResult();
      if (dropResult) {
        switch (dropResult.name) {
          case BACKLOG:
            changeItemCategory(item, BACKLOG);
            break;
          case TODO:
            changeItemCategory(item, TODO);
            break;
          case INPROGRESS:
            changeItemCategory(item, INPROGRESS);
            break;
          case DONE:
            changeItemCategory(item, DONE);
            break;
        }
      }
    },
  }));

  useEffect(() => {
    switch (item.category) {
      case BACKLOG:
        setBadgeColor('darkslateblue');
        break;

      case TODO:
        setBadgeColor('mediumorchid');
        break;
      case INPROGRESS:
        setBadgeColor('palevioletred');
        break;
      case DONE:
        setBadgeColor('saddlebrown');
        break;
    }
  }, [item]);

  return (
    <div
      className="cardWrap"
      ref={dragRef}
      style={{ opacity: isDragging ? '0.5' : '1' }}
    >
      <div className="cardHeaderWrap">
        <span
          className="cardTitleBadge"
          style={{ backgroundColor: badgeColor }}
        >
          {item.category}
        </span>
        <img
          className="btndelete"
          src="assets/images/cancel-button.png"
          alt="delete"
          onClick={deleteItem}
        />
      </div>
      <input
        className="cardTitle"
        type="text"
        value={item.title}
        onChange={editTitle}
        placeholder="Title"
      />
      <textarea
        className="cardContent"
        value={item.content}
        onChange={editContent}
        onInput={handleResizeHeight}
        ref={ref}
        placeholder="Content"
        spellCheck="false"
      />
    </div>
  );
}

export default React.memo(KabanCard);
