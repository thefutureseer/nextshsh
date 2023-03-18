import Navbar from '../components/Navbar';
import religions from '../../utils/apiData/religionApI';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const container = document.querySelector('.container');
    const draggableDivs = document.querySelectorAll('.draggable');
    // const hideBtns = document.querySelectorAll('.hide-btn');
    const hideBtns = document.querySelectorAll('.draggable .hide-btn');

    // Set up event listeners for drag events on the draggable divs
    draggableDivs.forEach((draggableDiv) => {
      draggableDiv.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', draggableDiv.id);
        // Add class to indicate dragging
        draggableDiv.classList.add('dragging');
      });

      draggableDiv.addEventListener('dragend', () => {
        // Remove class to indicate dragging
        draggableDiv.classList.remove('dragging');
      });
    });

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });

    container.addEventListener('drop', (e) => {
      e.preventDefault();
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }

    // Set up event listeners for hide buttons
    // hideBtns.forEach((hideBtn) => {
    //   hideBtn.addEventListener('click', () => {
    //     const draggableDiv = hideBtn.parentElement;
    //     const draggableId = draggableDiv.getAttribute('id');
    //     const draggableToHide = document.querySelector(`#${draggableId}`);
    //     draggableToHide.classList.toggle('hidden');
    //   });
    // });

    // Clean up event listeners when component unmounts
    return () => {
      draggableDivs.forEach((draggableDiv) => {
        draggableDiv.removeEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', draggableDiv.id);
        });
        draggableDiv.removeEventListener('dragend', () => {
          draggableDiv.classList.remove('dragging');
        });
      });
      container.removeEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
      container.removeEventListener('drop', (e) => {
        e.preventDefault();
      });
      hideBtns.forEach((hideBtn) => {
        hideBtn.removeEventListener('click', () => {
          const draggableDiv = hideBtn.parentElement;
          const draggableId = draggableDiv.getAttribute('id');
          const draggableToHide = document.querySelector(`#${draggableId}`);
          draggableToHide.classList.toggle('hidden');
        });
      });
    };
  }, []); // Empty array as second argument to only run effect once

  const toggleHidden = (religion) => {
    setHidden(!hidden);
    const draggableDivs = document.querySelectorAll('.draggable');
    draggableDivs.forEach((draggableDiv) => {
      if(draggableDiv.id.slice(10,11)==religion){
        console.log(draggableDiv.id, "#?");
        draggableDiv.classList.toggle('hidden');
      }
    });
  };
  return (
    <>
      <Navbar />
      <p>Drag and drop to rearrange the divs</p>
      <div className="container">
        {religions.map((religion) => (
          <div
            className="draggable"
            id={`draggable-${religion.id}`}
            draggable="true"
            key={religion.id}
          >
            <h2>{religion.name}</h2>
            <p>{religion.description}</p>
            <button
              className="hide-btn"
              onClick={() => toggleHidden(religion.id)}
            >
              {hidden === religion.id ? 'Show' : 'Hide'} This one
            </button>
          </div>
        ))}
      </div>
    </>
  );
};