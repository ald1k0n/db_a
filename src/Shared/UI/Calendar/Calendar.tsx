import React, { useState } from 'react'
import {classNames} from "Shared/lib";
import {
    add,
    format,
    getDay,
    getMonth,
    eachDayOfInterval,
    isSameDay,
    isSameMonth,
    isToday,
    startOfWeek,
    endOfWeek,
    endOfMonth,
} from 'date-fns'
import {HiChevronLeft, HiChevronRight} from "react-icons/hi";

type CalendarProps = {
    value: Date | null,
    setValue: React.Dispatch<React.SetStateAction<Date | null>>,
    className?: string,
    titleClassName?: string,
    buttonClassName?: string
    hoverClassName?: string,
    todayClassName?: string,
    selectedClassName?: string,
    currentMonthClassName?: string,
}

export const Calendar = (props: CalendarProps) => {
    let [selectedDate, setSelectedDate] = useState<Date | null>(props.value)
    let [selectedMonth, setSelectedMonth] = useState(new Date(format(new Date(), 'MMM-yyyy')))
    let days = eachDayOfInterval({
        start: startOfWeek(selectedMonth, {weekStartsOn: 1}),
        end: endOfWeek(endOfMonth(selectedMonth), {weekStartsOn: 1}),
    })

    const previousMonth = () => {
        setSelectedMonth(add(selectedMonth, { months: -1 }))
    }

    const nextMonth = () => {
        setSelectedMonth(add(selectedMonth, { months: 1 }))
    }

    let colStartClasses = [
        '',
        'col-start-1',
        'col-start-2',
        'col-start-3',
        'col-start-4',
        'col-start-5',
        'col-start-6',
    ]
    let daysOfWeek: string[] = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс',
    ]
    let month: string[] = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ]
    return (
        <div className={props.className}>
            <div className="flex flex-row justify-between items-center">
                <button
                    onClick={previousMonth}
                >
                    <span className="sr-only">Previous month</span>
                    <HiChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <div className={props.titleClassName}>
                    {month[getMonth(selectedMonth)]}
                </div>
                <button
                    onClick={nextMonth}
                >
                    <span className="sr-only">Next month</span>
                    <HiChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
            </div>
            <div className="grid grid-cols-7 mt-10">
                {daysOfWeek.map((dayOfWeek) => [
                    <div key={dayOfWeek} className={'text-xs leading-6 text-center'}>{dayOfWeek}</div>
                ])}
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
                {days.map((day, dayIdx) => (
                    <div
                        key={day.toString()}
                        className={classNames(
                            dayIdx === 0 && colStartClasses[getDay(day)],
                            'py-1.5'
                        )}
                    >
                        <button
                            type="button"
                            onClick={() => {
                                if(selectedDate && isSameDay(selectedDate, day)){
                                    props.setValue(null)
                                    setSelectedDate(null)
                                } else {
                                    props.setValue(day)
                                    setSelectedDate(day)
                                }

                                if(!isSameMonth(day, selectedMonth)){
                                    setSelectedMonth(new Date(format(day, 'MMM-yyyy')))
                                }
                            }}
                            className={classNames(
                                props.buttonClassName,
                                selectedDate && isSameDay(day, selectedDate) && props.selectedClassName,
                                selectedDate && !isSameDay(day, selectedDate) && props.hoverClassName,
                                isToday(day) && props.todayClassName,
                                isSameMonth(day, selectedMonth) && props.currentMonthClassName,
                            )}
                        >
                            <time dateTime={format(day, 'yyyy-MM-dd')}>
                                {format(day, 'd')}
                            </time>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}