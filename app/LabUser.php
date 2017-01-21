<?php

namespace LabEquipment;

use Illuminate\Database\Eloquent\Model;

class LabUser extends Model
{
	protected $fillable = ['user_id', 'lab_id'];

	public function lab()
	{
		return $this->belongsTo('LabEquipment\Lab');
	}

	public function user()
	{
		return $this->belongsTo('LabEquipment\User');
	}
}
