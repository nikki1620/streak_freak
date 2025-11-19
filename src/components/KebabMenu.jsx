import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Flag, Edit, Calendar, CalendarCheck } from 'lucide-react'
import PrioritySelector from './PrioritySelector'
import ModifyHabitDialog from './ModifyHabitDialog'
import CalendarEditor from './CalendarEditor'
import { useHabits } from '../contexts/HabitContext'

export default function KebabMenu({ habit }) {
  const { setPriority } = useHabits()
  const [isOpen, setIsOpen] = useState(false)
  const [showPrioritySelector, setShowPrioritySelector] = useState(false)
  const [showModifyDialog, setShowModifyDialog] = useState(false)
  const [showCalendarEditor, setShowCalendarEditor] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
        setShowPrioritySelector(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const menuItems = [
    {
      icon: Flag,
      label: 'Set Priority',
      onClick: () => {
        setShowPrioritySelector(true)
        setIsOpen(false)
      },
    },
    {
      icon: Edit,
      label: 'Modify Habit',
      onClick: () => {
        setShowModifyDialog(true)
        setIsOpen(false)
      },
    },
    {
      icon: Calendar,
      label: 'Set Streak Start Date',
      onClick: () => {
        // This will be handled by ModifyHabitDialog
        setShowModifyDialog(true)
        setIsOpen(false)
      },
    },
    {
      icon: CalendarCheck,
      label: 'Edit Calendar',
      onClick: () => {
        setShowCalendarEditor(true)
        setIsOpen(false)
      },
    },
  ]

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50 min-w-[200px]">
            {menuItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="w-full px-4 py-2 text-left hover:bg-white/10 transition-colors flex items-center gap-3 text-white/90 hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        )}

        {showPrioritySelector && (
          <div className="absolute right-0 top-full mt-2 z-50">
            <PrioritySelector
              priority={habit.priority}
              onSelect={(priority) => {
                setPriority(habit.id, priority)
              }}
              onClose={() => setShowPrioritySelector(false)}
            />
          </div>
        )}
      </div>

      {showModifyDialog && (
        <ModifyHabitDialog
          habit={habit}
          onClose={() => setShowModifyDialog(false)}
        />
      )}

      {showCalendarEditor && (
        <CalendarEditor
          habit={habit}
          onClose={() => setShowCalendarEditor(false)}
        />
      )}
    </>
  )
}

