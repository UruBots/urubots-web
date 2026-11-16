const sections: { title: string; body: string }[] = [
  {
    title: 'Mobile Base & Navigation',
    body: 'Differential-drive base built with dual 6.5" BLDC hoverboard hub motors (custom STM32F103 FOC firmware, 90 Hall ticks/rev, track_width = 0.5620 m, wheel_radius = 0.0853 m) and a Hokuyo UST-05LX 2D LiDAR (270°, 0.06–5 m, 40 Hz, beam height 38 cm), running Nav2 + AMCL + SmacPlanner2D + RegulatedPurePursuit on ROS 2 Jazzy.',
  },
  {
    title: 'Torso & Manipulation',
    body: 'NEMA23 / ESP32-S3 vertical prismatic lift column and a side-mounted 6-DOF AgileX Piper manipulator with parallel gripper and an eye-in-hand Orbbec DaBai DC1 camera, planned with MoveIt 2 (TRAC-IK + OMPL) and supervised via a FollowJointTrajectory action server.',
  },
  {
    title: 'Head & HRI',
    body: '2-DOF Dynamixel XL430-W250 pan-tilt head carrying an Intel RealSense D435 RGB-D camera, a RODE VideoMic GO II directional shotgun microphone, an animated facial display and a TTS speaker.',
  },
  {
    title: 'Distributed Compute',
    body: 'Wired 1 Gb/s Ethernet, ROS 2 Jazzy + CycloneDDS unicast, no team Wi-Fi hotspots. Host 1 (Intel NUC i3-1220P, Ubuntu 24.04): Nav2, AMCL, RealSense D435 face/pose perception (YuNet/SFace, YOLOv8-pose), Receptionist & Mission Executor, deterministic bilingual NL/GPSR compiler and a local URDF/Xacro web editor. Host 2 (NVIDIA Jetson Orin Nano Super 8 GB, JetPack 7.2.1 / L4T R39.2.1, Ubuntu 24.04): 50 Hz CAN Piper controller, U2D2 pan-tilt node, Orbbec DaBai wrist stream + TensorRT FP16 YOLO detector (55 FPS end-to-end on GPU vs. 5.2 FPS on CPU, verified on hardware), and on-demand faster-whisper ASR with Silero VAD.',
  },
  {
    title: 'Safety & Evidence Note',
    body: 'All actuator drivers boot disabled by default (auto_enable=False on Piper, auto_torque=false on pan-tilt), reject motion commands without fresh hardware feedback, and never publish synthetic zeros as measured joint states. Capabilities validated only in simulation (SIM_PASS, such as the natural-language Commander and trash-disposal sequence) validate software logic and kinematics only and do not demonstrate physical safety on real hardware.',
  },
];

export function PlatformSummary() {
  return (
    <section id="platform" className="py-10">
      <h2 className="mb-2 text-3xl font-bold text-black dark:text-white">Base@Home platform</h2>
      <p className="mb-6 text-body-color dark:text-body-color-dark">
        Base@Home is a custom low-cost domestic service robot developed by UruBots for the RoboCup@Home Open Platform
        League (OPL), at Universidad Tecnológica del Uruguay (UTEC), ITR Norte, Rivera.
      </p>
      <div className="space-y-6">
        {sections.map((s) => (
          <div key={s.title}>
            <h3 className="mb-1 text-xl font-semibold text-black dark:text-white">{s.title}</h3>
            <p className="text-body-color dark:text-body-color-dark">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
