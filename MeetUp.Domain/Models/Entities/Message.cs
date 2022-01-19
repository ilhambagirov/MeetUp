using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeetUp.Domain.Models.Entities
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Sender")]
        public string SenderId { get; set; }
        public AppUser Sender { get; set; }
        [ForeignKey("Receiver")]
        public string ReceiverId { get; set; }
        public AppUser Receiver { get; set; }
        public string MessageText { get; set; }
        public DateTime Date { get; set; }
        public bool IsRead { get; set; }
    }
}