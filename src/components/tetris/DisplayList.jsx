import styled from 'styled-components';
import React from 'react';
import { settings } from '../../helper/gameSignals';
import Display from './Display';
import { StatDisplay } from '../../helper/settingsObjects';
import { useTranslation } from 'react-i18next';

const DisplayList = () => {
    const { t } = useTranslation();
    return (
        <StyledDisplayList>
            {settings.value[StatDisplay._Key]?.map((stat, index) =>
                <Display key={index} stat={stat} t={t}/>
            )}
        </StyledDisplayList>
    )}

const StyledDisplayList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export default React.memo(DisplayList);
