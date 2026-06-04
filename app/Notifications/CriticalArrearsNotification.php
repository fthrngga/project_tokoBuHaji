<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class CriticalArrearsNotification extends Notification
{
    use Queueable;

    protected $message;
    protected $targetUrl;

    public function __construct($message, $targetUrl)
    {
        $this->message = $message;
        $this->targetUrl = $targetUrl;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'title' => 'Tunggakan Kritis (> 3 Bulan)',
            'message' => $this->message,
            'target_url' => $this->targetUrl,
            'type' => 'critical',
        ];
    }
}
