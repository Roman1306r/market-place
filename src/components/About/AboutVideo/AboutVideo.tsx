import video from './../../../assets/about/about.mp4'

const AboutVideo = () => {

    return (<article className='about__video'>
                <video loop controls width={'100%'} autoPlay src={video}></video>
            </article>);
}
export default AboutVideo;