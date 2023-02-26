import { useRecoilValue } from 'recoil';
import KanbanList from './components/KanbanList';
import Card from './components/KabanCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { kanbanListState } from './recoil';
import './App.scss';

export const TITLENAME = {
  BACKLOG: 'Back log',
  TODO: 'To do',
  INPROGRESS: 'In Progress',
  DONE: 'Done',
};

function App() {
  const kanbanList = useRecoilValue(kanbanListState);
  const { BACKLOG, TODO, INPROGRESS, DONE } = TITLENAME;

  const cardDataHandler = (cardTitle: string) => {
    return kanbanList
      .filter((data) => data.category === cardTitle)
      .map((item, index) => <Card key={item.id} item={item} />);
  };

  return (
    <>
      <header>
        <span className="title">Kaban Board - Jiye Yu</span>

      </header>
      <section className="kanbanListContainer">
        <DndProvider backend={HTML5Backend}>
          <KanbanList title={BACKLOG}>{cardDataHandler(BACKLOG)}</KanbanList>
          <KanbanList title={TODO}>
            {cardDataHandler(TODO)}
          </KanbanList>
          
          <KanbanList title={INPROGRESS}>{cardDataHandler(INPROGRESS)}</KanbanList>
          <KanbanList title={DONE}>{cardDataHandler(DONE)}</KanbanList>
        </DndProvider>
      </section>
    </>
  );
}

export default App;
