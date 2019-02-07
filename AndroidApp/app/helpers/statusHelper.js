import React from 'react';
import {Theme} from "../components/theme";
import {getColorForAmount} from "./colorHelper";
import {Text} from "react-native";
import {getSummaryDisplayString} from "./displayStringHelper";

export const getStatusFromSummary = (summary) => (<Text style = {
    {
        textAlign: 'center',
        fontSize: Theme.statusFontSize,
        color: getColorForAmount(summary)
    }}>{getSummaryDisplayString(summary)}</Text>);