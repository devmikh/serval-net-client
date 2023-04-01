// import moment from 'moment';
import moment from 'moment-timezone';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const formatDate = (date: any) => {
    return moment(date).tz(timezone).format('MMMM Do YYYY, h:mm:ss a');
};

const formatDateFromNow = (date: any) => {
    return moment(date).tz(timezone).fromNow();
};

const formatDateMonthYear = (date: any) => {
    return moment(date).tz(timezone).format('MMMM YYYY');
};

export {
    formatDate,
    formatDateFromNow,
    formatDateMonthYear
}