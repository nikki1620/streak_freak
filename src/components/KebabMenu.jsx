import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { MoreVertical, Flag, Edit } from 'lucide-react'
import PrioritySelector from './PrioritySelector'
import ModifyHabitDialog from './ModifyHabitDialog'
import { useHabits } from '../contexts/HabitContext'

export default function KebabMenu({ habit }) {
  const { setPriority } = useHabits()
  const [isOpen, setIsOpen] = useState(false)
  const [showPrioritySelector, setShowPrioritySelector] = useState(false)
  const [showModifyDialog, setShowModifyDialog] = useState(false)
  const [shouldRestoreMenu, setShouldRestoreMenu] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, right: 'auto' })

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const dropdownWidth = 220 // min width for dropdown
      const dropdownHeight = 180 // approximate height for 3 items
      
      // Calculate position - prefer right alignment
      let right = viewportWidth - buttonRect.right
      let left = 'auto'
      let top = buttonRect.bottom + 8 // mt-2 = 8px
      
      // Adjust if dropdown would go off screen to the right (mobile)
      if (right < dropdownWidth) {
        // Position to the left of button instead
        left = buttonRect.left - dropdownWidth
        right = 'auto'
        // If still off screen, align to viewport edge
        if (left < 8) {
          left = 8
        }
      }
      
      // Adjust if dropdown would go off screen to the bottom
      if (top + dropdownHeight > viewportHeight && buttonRect.top > dropdownHeight) {
        top = buttonRect.top - dropdownHeight - 8
        // Ensure it doesn't go above viewport
        if (top < 8) {
          top = 8
        }
      }
      
      setDropdownPosition({ top, left, right })
    }
  }, [isOpen])

  useEffect(() => {
    function handleClickOutside(event) {
      if (!isOpen) return
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    function handleEscape(event) {
      if (!isOpen) return
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside, true)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  useEffect(() => {
    const overlayActive = isOpen || showPrioritySelector || showModifyDialog
    document.body.style.overflow = overlayActive ? 'hidden' : ''

    return () => {
      if (!overlayActive) {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, showPrioritySelector, showModifyDialog])

  const reopenMenuIfNeeded = () => {
    if (shouldRestoreMenu) {
      setIsOpen(true)
      setShouldRestoreMenu(false)
    }
  }

  const openPrioritySelector = () => {
    setShouldRestoreMenu(true)
    setIsOpen(false)
    setShowPrioritySelector(true)
  }

  const handlePrioritySelect = (selectedPriority) => {
    setPriority(habit.id, selectedPriority)
    setShowPrioritySelector(false)
    reopenMenuIfNeeded()
  }

  const closePrioritySelector = () => {
    setShowPrioritySelector(false)
    reopenMenuIfNeeded()
  }

  const openModifyDialog = () => {
    setShouldRestoreMenu(true)
    setIsOpen(false)
    setShowModifyDialog(true)
  }

  const handleCloseModifyDialog = () => {
    setShowModifyDialog(false)
    reopenMenuIfNeeded()
  }

  const menuItems = [
    {
      icon: Flag,
      label: 'Set Priority',
      description: 'Choose habit importance',
      onClick: openPrioritySelector,
    },
    {
      icon: Edit,
      label: 'Modify Habit',
      description: 'Rename or adjust streak start',
      onClick: openModifyDialog,
    },
  ]

  const handleToggle = (e) => {
    e.stopPropagation()

    if (showPrioritySelector) {
      closePrioritySelector()
      setIsOpen(true)
      return
    }

    setIsOpen((prev) => {
      const next = !prev
      if (!next) {
        setShouldRestoreMenu(false)
      }
      return next
    })
  }

  const handleItemClick = (onClick) => (e) => {
    e.stopPropagation()
    onClick()
  }

  const dropdownContent = isOpen && (
    <div
      ref={dropdownRef}
      className="fixed bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl z-[9999] min-w-[240px] text-white animate-fade-in"
      style={{
        top: `${dropdownPosition.top}px`,
        left: dropdownPosition.left !== 'auto' ? `${dropdownPosition.left}px` : 'auto',
        right: dropdownPosition.right !== 'auto' ? `${dropdownPosition.right}px` : 'auto',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-sm font-semibold text-white">Quick Actions</p>
        <p className="text-xs text-white/70">Manage this habit</p>
      </div>
      {menuItems.map((item, idx) => {
        const Icon = item.icon
        return (
          <button
            key={idx}
            onClick={handleItemClick(item.onClick)}
            className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3 text-white/90"
          >
            <div className="p-2 rounded-xl bg-white/10 flex items-center justify-center">
              <Icon className="w-4 h-4 flex-shrink-0 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="text-xs text-white/70">{item.description}</span>
            </div>
          </button>
        )
      })}
    </div>
  )

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          ref={buttonRef}
          onClick={handleToggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {isOpen && createPortal(dropdownContent, document.body)}

        {showPrioritySelector && (
          <div className="absolute right-0 top-full mt-2 z-[10000]">
            <PrioritySelector
              priority={habit.priority}
              onSelect={handlePrioritySelect}
              onClose={closePrioritySelector}
            />
          </div>
        )}
      </div>

      {showModifyDialog && (
        <ModifyHabitDialog
          habit={habit}
          onClose={handleCloseModifyDialog}
        />
      )}

    </>
  )
}

