import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { settings } from '../helper/gameSignals';
import { StatsSort } from '../helper/settingsObjects';
import { ArrowBigDownDash } from 'lucide-react';

const TableHeaderItem = ({sort}) => {

    const { t } = useTranslation();

    const getClass = () => {
        const sortList = settings.value[StatsSort._Key];
        if(sortList?.includes(sort)) {
            return "active";
        } else {
            return "";
        }
    }

    const toggleSort = (e) => {

        if(e.shiftKey) {
            if(settings.value[StatsSort._Key]?.includes(sort)) {
                settings.value = {
                    ...settings.value,
                    [StatsSort._Key]: settings.value[StatsSort._Key].filter((val) => val !== sort),
                }
            } else {
                settings.value = {
                    ...settings.value,
                    [StatsSort._Key]: [...settings.value[StatsSort._Key] ?? [], sort],
                }
            }
        } else {
            settings.value = {
                ...settings.value,
                [StatsSort._Key]: [sort],
            }
        }
    }

    return (
        <StyledTableHederItem
        className={getClass()}
        onClick={toggleSort}
        >
            <span >{t(sort)}</span>
            {getClass() && <ArrowBigDownDash className='arrow' />}
        </StyledTableHederItem>
    )
} 

const StyledTableHederItem = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    gap: 5px;

    span {
        font-size: 0.8rem;
        font-weight: bold;
    }

    &:hover {
        background-color: ${props => props.theme.colors.secondary};
    }

    .arrow {
        width: 32px;
        aspect-ratio: 1 / 1;
        max-width: 32px;
        min-width: 32px;
    }

`

export default TableHeaderItem;