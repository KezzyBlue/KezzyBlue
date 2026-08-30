import { useMemo } from "react";
import { Clock3, MoonStar, Sparkles, Telescope } from "lucide-react";
import { calculateAstronomyData } from "../api/astronomy/astronomyData";
import './TonightSky.css';
const TonightSky = () => {
    const sky = useMemo(() => calculateAstronomyData(new Date()), []);

    const events = [
        {
            label: "Astronomical twilight",
            time: sky.astronomicalTwilight?.time ?? "--:--",
            description: sky.astronomicalTwilight?.description ?? "Waiting for data",
        },
        {
            label: "Moon transit",
            time: sky.moon?.transitTime ?? "--:--",
            description: `${sky.moon?.phase ?? "Moon"} · ${sky.moon?.direction ?? "--"}`,
        },
        {
            label: "Milky Way transit",
            time: sky.milkyWay?.transitTime ?? "--:--",
            description: `${sky.milkyWay?.direction ?? "--"} · ${sky.milkyWay?.maxAltitude ?? "--°"}`,
        },
    ];

    return (
        <div className="tonightSkyCard">
            <div className="tonightSkyHeader">
                <div>
                    <p className="tonightSkyLabel">Tonight’s sky</p>
                    <h2 className="tonightSkyTitle">
                        <Sparkles size={18} />
                        Night overview
                    </h2>
                </div>
                <div className="skyStatusPill tooltipWrapper" data-tooltip="Moon illumination percentage">
                    <MoonStar size={14} />
                    {sky.moon?.illumination ?? "--%"}
                </div>
            </div>

            <div className="skyTimeline">
                {events.map((event, index) => (
                    <div className="skyTimelineItem" key={event.label}>
                        <div className="skyTimelineMarkerWrap">
                            <span className="skyTimelineMarker" />
                            {index < events.length - 1 && <span className="skyTimelineLine" />}
                        </div>

                        <div className="skyTimelineContent">
                            <div className="skyEventRow">
                                <span className="skyEventLabel">{event.label}</span>
                                <span className="skyEventTime">{event.time}</span>
                            </div>
                            <p className="skyEventMeta">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="skyDivider" />

            <div className="skyDetailRow">
                <div className="skyDetailItem tooltipWrapper" data-tooltip="Light pollution level">
                    <div className="skyDetailIcon" aria-label="Light pollution icon">
                        <Telescope size={16} />
                    </div>
                    <div>
                        <span className="skyDetailLabel">Light pollution</span>
                        <strong className="skyDetailValue">Bortle {sky.lightPollution?.bortle ?? "--"}</strong>
                    </div>
                </div>
                <div className="skyDetailItem skyDetailItemCompact tooltipWrapper" data-tooltip="Best sky window">
                    <div className="skyDetailIcon" aria-label="Best window icon">
                        <Clock3 size={16} />
                    </div>
                    <div>
                        <span className="skyDetailLabel">Best window</span>
                        <strong className="skyDetailValue">{sky.milkyWay?.transitTime ?? "--:--"}</strong>
                    </div>
                </div>
            </div>

            <p className="skyPollutionText">{sky.lightPollution?.description ?? "Sky conditions are being estimated for this location."}</p>
        </div>
    );
};

export default TonightSky;
