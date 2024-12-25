import express from 'express';
import Notification from '../models/notifications.js';

const router = express.Router();

// Fetch notifications for a specific user
router.get('/notifications/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Create a notification when a user is added/scheduled for an appointment
router.post('/notifications', async (req, res) => {
  const { userId, appointmentId, message } = req.body;

  try {
    const notification = new Notification({
      userId,
      appointmentId,
      message,
      type: 'appointment',
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

// Mark a notification as read
router.patch('/notifications/:id/read', async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
});

export default router;
