import * as AE from "astronomy-engine";

const observer = new AE.Observer(21.4412, 105.5404, 0);
const localTimeZone = "Asia/Bangkok";

const getDirectionLabel = (azimuth) => {
    if (azimuth === null || Number.isNaN(azimuth)) return "--";

    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((azimuth % 360) / 45)) % 8;
    return directions[index];
};

const toDate = (value) => {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value === "number") return new Date(value);
    if (value.date instanceof Date) return value.date;
    if (value.time && value.time.date instanceof Date) return value.time.date;
    return new Date(value);
};

const formatClock = (value) => {
    const date = toDate(value);
    if (!date || Number.isNaN(date.getTime())) return "--:--";

    return new Intl.DateTimeFormat("en-GB", {
        timeZone: localTimeZone,
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

const toPercent = (value) => {
    if (typeof value !== "number" || Number.isNaN(value)) return "--%";
    return `${Math.round(value * 100)}%`;
};

const lightPollutionEstimate = {
    bortle: 5,
    description: "suburban sky with a soft glow toward the horizon",
};

export const calculateAstronomyData = (referenceDate = new Date()) => {
    const dateStart = new Date(referenceDate);

    const astronomicalDusk = AE.SearchAltitude(AE.Body.Sun, observer, -1, dateStart, 1, -18);
    const astronomicalDawn = AE.SearchAltitude(AE.Body.Sun, observer, +1, dateStart, 1, -18);
    const moonTransit = AE.SearchHourAngle(AE.Body.Moon, observer, 0, dateStart, +1);
    const moonIllumination = AE.Illumination(AE.Body.Moon, dateStart);

    AE.DefineStar(AE.Body.Star1, 17.761111, -29.0078, 27000);
    const milkyWayTransit = AE.SearchHourAngle(AE.Body.Star1, observer, 0, dateStart, +1);

    const phaseLongitude = AE.MoonPhase(dateStart);
    const phaseLabel =
        phaseLongitude >= 315 || phaseLongitude < 45 ? "New moon" :
        phaseLongitude >= 45 && phaseLongitude < 135 ? "Waxing gibbous" :
        phaseLongitude >= 135 && phaseLongitude < 225 ? "Full moon" :
        "Waning crescent";

    const moonAltitude = moonTransit?.hor?.altitude ?? 0;
    const milkyWayAltitude = milkyWayTransit?.hor?.altitude ?? 0;

    return {
        astronomicalTwilight: {
            time: formatClock(astronomicalDusk ?? astronomicalDawn ?? null),
            label: astronomicalDusk ? "Astronomical Twilight" : "Twilight window",
            description: astronomicalDusk ? "Dusk ends after the Sun dips below -18°" : "Sky data is updating",
        },
        moon: {
            visible: moonAltitude > 0,
            transitTime: formatClock(moonTransit?.time ?? null),
            maxAltitude: `${Math.round(moonAltitude)}°`,
            illumination: toPercent(moonIllumination?.phase_fraction ?? 0),
            direction: getDirectionLabel(moonTransit?.hor?.azimuth),
            phase: phaseLabel,
        },
        milkyWay: {
            transitTime: formatClock(milkyWayTransit?.time ?? null),
            maxAltitude: `${Math.round(milkyWayAltitude)}°`,
            azimuth: milkyWayTransit && milkyWayTransit.hor ? `${Math.round(milkyWayTransit.hor.azimuth)}°` : "--°",
            direction: getDirectionLabel(milkyWayTransit?.hor?.azimuth),
        },
        lightPollution: lightPollutionEstimate,
    };
};

export const formatLocalTime = formatClock;
