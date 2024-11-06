import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = ({ setButtonText, setButtonPath }) => {

    const router = useNavigate();
    const sliderRef = useRef(null);

    setButtonText('Sign In')
    setButtonPath('/signin')

    const [trending, setTrendingSongs] = useState([]);
    const [week20, setWeek20] = useState([]);
    const [month50, SetMonth50] = useState([]);
    const [evergreen, setEvergreen] = useState([]);
    const [happy, SetHappy] = useState([]);
    const [romantic, setRomantic] = useState([]);
    const [excited, setExcited] = useState([]);
    const [sad, setSad] = useState([]);
    const fetchList = [
        { featured: 'Trending songs', setter: setTrendingSongs },
        { featured: 'Top 20 of this week', setter: setWeek20 },
        { featured: 'Top 50 of this month', setter: SetMonth50 },
        { featured: 'Evergreen melodies', setter: setEvergreen },
        { mood: 'happy', setter: SetHappy },
        { mood: 'romantic', setter: setRomantic },
        { mood: 'excited', setter: setExcited },
        { mood: 'sad', setter: setSad }
    ];
    useEffect(() => {
        fetchList.forEach(({ featured, mood, setter }) => {
            const baseUrl = 'https://academics.newtonschool.co/api/v1/musicx/song';
            let url = baseUrl;
            if (featured) {
                url += `?featured=${encodeURIComponent(featured)}`;
            } else if (mood) {
                url += `?mood=${encodeURIComponent(mood)}`;
            }
            fetchSongs(url, setter);
        });
    }, []);
    
    const fetchSongs = async (url, setter) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'accept': 'application/json',
                    'projectID': 'jscjwatei3cb'
                }
            });
            const data = await response.json();
            setter(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
        const fetch_List = [
            { title: 'Trending Songs', data: trending, setter: setTrendingSongs },
            { title: 'Top 20 of this Week', data: week20, setter: setWeek20 },
            { title: 'Top 50 of this Month', data: month50, setter: SetMonth50 },
            { title: 'Evergreen Melodies', data: evergreen, setter: setEvergreen },
            { title: 'Happy Songs', data: happy, setter: SetHappy },
            { title: 'Romantic Songs', data: romantic, setter: setRomantic },
            { title: 'Excited Songs', data: excited, setter: setExcited },
            { title: 'Sad Songs', data: sad, setter: setSad }
        ];
        
        return (
            <div className='bg-[#262628] text-white pt-[70px]'>
                {fetch_List.map(({ title, data }, index) => (
                    <div key={index} className={title.replace(/\s/g, '').toLowerCase()}>
                        <h1 className='font-[900] text-4xl px-5 py-2'>{title}</h1>
                        <div className='flex flex-row justify-center'>
                            <div className='flex flex-row overflow-scroll scroll-smooth transition-[scroll] duration-[0.3s] ease-[ease-in-out]' ref={sliderRef}>
                                {data.map((item) => (
                                    <div 
                                        key={item._id}
                                        className='m-2'
                                        onClick={() => {
                                            router(`/song/${item._id}`)
                                        }}>
                                        <div className='h-[250px] w-[250px] max-w-none'  >
                                        <img 
                                            src={item.thumbnail} 
                                            alt={`${item.name} thumbnail`} 
                                            className='h-[250px] w-[250px] max-w-none' 
                                        />
                                        <i className="fa-regular fa-circle-play text-4xl relative bottom-12 left-52 text-white opacity-90 hover:opacity-100 cursor-pointer"></i> 
                                        </div>
                                        <h2 className='font-[900]'>{item.title}</h2>
                                        {item.artist.map((artist, idx) => (
                                            <span key={idx} className='text-slate-400'>
                                                {artist.name}{idx !== item.artist.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
        
}

export default Home;

