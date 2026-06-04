<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class InstallmentReminderNotification extends Notification
{
    use Queueable;

    protected $message;
    protected $targetUrl;
    protected $daysUntilDue;

    public function __construct($message, $targetUrl, $daysUntilDue)
    {
        $this->message = $message;
        $this->targetUrl = $targetUrl;
        $this->daysUntilDue = $daysUntilDue;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'title' => $this->daysUntilDue < 0 ? 'Tunggakan Angsuran' : 'Peringatan Jatuh Tempo',
            'message' => $this->message,
            'target_url' => $this->targetUrl,
            'type' => $this->daysUntilDue < 0 ? 'danger' : 'warning',
        ];
    }
}
